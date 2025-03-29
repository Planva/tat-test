import { createClient } from 'npm:@supabase/supabase-js@2.39.7';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

async function getAIAnalysis(text: string) {
  try {
    const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('HUGGINGFACE_API_KEY')}`,
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

    const result = await response.json();
    return result[0]?.generated_text || 'Unable to generate AI analysis.';
  } catch (error) {
    console.error('Error getting AI analysis:', error);
    return 'Unable to generate AI analysis at this time.';
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { story } = await req.json();
    const aiAnalysis = await getAIAnalysis(story);

    return new Response(
      JSON.stringify({ analysis: aiAnalysis }),
      {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
});