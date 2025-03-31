interface Env {
  TAT_IMAGES: KVNamespace;
  TAT_RESPONSES: KVNamespace;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const DEFAULT_IMAGES = [
  'https://images.tat-test.com/tat-images1.jpg',
  'https://images.tat-test.com/tat-images2.jpg',
  'https://images.tat-test.com/tat-images3.jpg',
  'https://images.tat-test.com/tat-images4.jpg',
  'https://images.tat-test.com/tat-images5.jpg',
  'https://images.tat-test.com/tat-images6.jpg',
  'https://images.tat-test.com/tat-images7.jpg',
  'https://images.tat-test.com/tat-images8.jpg',
  'https://images.tat-test.com/tat-images9.jpg',
  'https://images.tat-test.com/tat-images10.jpg',
  'https://images.tat-test.com/tat-images11.jpg',
  'https://images.tat-test.com/tat-images12.jpg',
  'https://images.tat-test.com/tat-images13.jpg',
  'https://images.tat-test.com/tat-images14.jpg',
  'https://images.tat-test.com/tat-images15.jpg',
  'https://images.tat-test.com/tat-images16.jpg',
  'https://images.tat-test.com/tat-images17.jpg',
  'https://images.tat-test.com/tat-images18.jpg',
  'https://images.tat-test.com/tat-images19.jpg',
  'https://images.tat-test.com/tat-images20.jpg',
  'https://images.tat-test.com/tat-images21.jpg',
  'https://images.tat-test.com/tat-images22.jpg',
  'https://images.tat-test.com/tat-images23.jpg',
  'https://images.tat-test.com/tat-images24.jpg',
  'https://images.tat-test.com/tat-images25.jpg',
  'https://images.tat-test.com/tat-images26.jpg',
  'https://images.tat-test.com/tat-images27.jpg',
  'https://images.tat-test.com/tat-images28.jpg',
  'https://images.tat-test.com/tat-images29.jpg',
  'https://images.tat-test.com/tat-images30.jpg',
  'https://images.tat-test.com/tat-images31.jpg'
];

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      const url = new URL(request.url);
      const path = url.pathname.replace('/api/', '');

      switch (path) {
        case 'images': {
          if (request.method === 'GET') {
            try {
              const images = await env.TAT_IMAGES.get('image_list', 'json');
              return new Response(
                JSON.stringify(images || DEFAULT_IMAGES),
                {
                  headers: {
                    'Content-Type': 'application/json',
                    ...corsHeaders,
                  },
                }
              );
            } catch (error) {
              console.error('Error fetching images:', error);
              return new Response(
                JSON.stringify(DEFAULT_IMAGES),
                {
                  headers: {
                    'Content-Type': 'application/json',
                    ...corsHeaders,
                  },
                }
              );
            }
          }
          break;
        }

        case 'submit': {
          if (request.method === 'POST') {
            const body = await request.json();
            const id = crypto.randomUUID();
            
            try {
              await env.TAT_RESPONSES.put(id, JSON.stringify(body.stories));
              return new Response(
                JSON.stringify({ success: true, id }),
                {
                  headers: {
                    'Content-Type': 'application/json',
                    ...corsHeaders,
                  },
                }
              );
            } catch (error) {
              console.error('Error saving response:', error);
              return new Response(
                JSON.stringify({ error: 'Failed to save response' }),
                {
                  status: 500,
                  headers: {
                    'Content-Type': 'application/json',
                    ...corsHeaders,
                  },
                }
              );
            }
          }
          break;
        }
      }

      return new Response(
        JSON.stringify({ error: 'Not Found' }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    } catch (error) {
      console.error('Error:', error);
      return new Response(
        JSON.stringify({ error: 'Internal Server Error' }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }
  },
} as ExportedHandler<Env>;