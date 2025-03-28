interface Env {
  HUGGINGFACE_API_KEY: string;
  TAT_IMAGES: KVNamespace;
  TAT_RESPONSES: KVNamespace;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept, Cache-Control',
};

async function getAIAnalysis(text: string, apiKey: string) {
  try {
    const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: `Analyze this story in terms of personality traits, emotional state, and cognitive patterns: "${text}"`,
        parameters: {
          max_length: 500,
          temperature: 0.7,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get AI analysis');
    }

    const result = await response.json();
    return result[0]?.generated_text || 'Unable to generate AI analysis.';
  } catch (error) {
    console.error('Error getting AI analysis:', error);
    return 'Unable to generate AI analysis at this time.';
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { 
        headers: {
          ...corsHeaders,
          'Access-Control-Max-Age': '86400',
        } 
      });
    }

    const url = new URL(request.url);
    let path = url.pathname;
    
    // Remove both /api/ and trailing slashes for consistent path matching
    path = path.replace(/^\/api\//, '').replace(/\/$/, '');

    console.log('Processing request for path:', path);

    try {
      switch (path) {
        case 'images': {
          if (request.method === 'GET') {
            try {
              const images = await env.TAT_IMAGES.get('image_list', 'json');
              
              if (!images || !Array.isArray(images) || images.length === 0) {
                throw new Error('No images available');
              }

              return new Response(JSON.stringify(images), {
                headers: {
                  'Content-Type': 'application/json',
                  'Cache-Control': 'no-cache',
                  ...corsHeaders,
                },
              });
            } catch (error) {
              console.error('Error handling images request:', error);
              return new Response(JSON.stringify({ 
                error: 'Failed to retrieve images',
                message: error instanceof Error ? error.message : 'Unknown error occurred'
              }), {
                status: 500,
                headers: {
                  'Content-Type': 'application/json',
                  'Cache-Control': 'no-cache',
                  ...corsHeaders,
                },
              });
            }
          }
          break;
        }

        case 'submit': {
          if (request.method === 'POST') {
            const { stories } = await request.json();
            const id = crypto.randomUUID();
            await env.TAT_RESPONSES.put(id, JSON.stringify(stories));
            
            return new Response(JSON.stringify({ success: true, id }), {
              headers: {
                'Content-Type': 'application/json',
                ...corsHeaders,
              },
            });
          }
          break;
        }

        case 'analyze': {
          if (request.method === 'POST') {
            const { story } = await request.json();
            const aiAnalysis = await getAIAnalysis(story, env.HUGGINGFACE_API_KEY);
            
            return new Response(JSON.stringify({ analysis: aiAnalysis }), {
              headers: {
                'Content-Type': 'application/json',
                ...corsHeaders,
              },
            });
          }
          break;
        }
      }

      return new Response('Not Found', { 
        status: 404, 
        headers: corsHeaders
      });
    } catch (error) {
      console.error('Error processing request:', error);
      return new Response(JSON.stringify({ 
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }
  }
} as ExportedHandler<Env>;