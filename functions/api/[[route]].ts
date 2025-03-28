import { PagesFunction } from '@cloudflare/workers-types';

interface Env {
  HUGGINGFACE_API_KEY: string;
}

const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?auto=format&fit=crop&w=800',
  'https://images.unsplash.com/photo-1541199249251-f713e6145474?auto=format&fit=crop&w=800',
  'https://images.unsplash.com/photo-1517677129300-07b130802f46?auto=format&fit=crop&w=800',
  'https://images.unsplash.com/photo-1520013817300-1f4c1cb245ef?auto=format&fit=crop&w=800',
  'https://images.unsplash.com/photo-1590075865003-e48277faa558?auto=format&fit=crop&w=800',
  'https://images.unsplash.com/photo-1597176116047-876a32798fcc?auto=format&fit=crop&w=800',
  'https://images.unsplash.com/photo-1594819047096-e65bf358b318?auto=format&fit=crop&w=800',
  'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=800',
  'https://images.unsplash.com/photo-1522556189639-b150ed9c4330?auto=format&fit=crop&w=800',
  'https://images.unsplash.com/photo-1534330207526-8e81f10ec6fc?auto=format&fit=crop&w=800'
];

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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
      const errorText = await response.text();
      console.error('Hugging Face API Error:', response.status, errorText);
      throw new Error(`Hugging Face API Error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    if (result.error) {
      console.error('Hugging Face API Result Error:', result.error);
      throw new Error(`Hugging Face API Result Error: ${result.error}`);
    }
    return result[0]?.generated_text || 'Unable to generate AI analysis.';
  } catch (error) {
    console.error('Error getting AI analysis:', error);
    return 'Unable to generate AI analysis at this time.';
  }
}


export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.pathname.replace('/api/', '');

    try {
      switch (path) {
        case 'images':
          if (request.method === 'GET') {
            let images = await env.TAT_IMAGES.get('image_list', 'json');
            if (!images) {
              // If no images exist in KV, set the default images
              await env.TAT_IMAGES.put('image_list', JSON.stringify(DEFAULT_IMAGES));
              images = DEFAULT_IMAGES;
            }
            return new Response(JSON.stringify(images), {
              headers: {
                'Content-Type': 'application/json',
                ...corsHeaders,
              },
            });
          }
          break;
        case 'analyze':
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

      return new Response('Not Found', { status: 404, headers: corsHeaders });
    } catch (error) {
      console.error('Error:', error);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }
  }
} as ExportedHandler<Env>;