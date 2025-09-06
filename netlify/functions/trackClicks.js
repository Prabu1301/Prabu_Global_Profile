const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

exports.handler = async (event) => {
  try {
    const { linkName } = JSON.parse(event.body);
    const referrer = event.headers.referer || "Unknown";

    if (!linkName) {
      return {
        statusCode: 400,
        body: 'Missing linkName'
      };
    }

    const { error } = await supabase.from('LinkClicks').insert([
      { link_name: linkName, referrer }
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return {
        statusCode: 500,
        body: 'Insert failed'
      };
    }

    return {
      statusCode: 200,
      body: 'Click logged'
    };
  } catch (err) {
    console.error("Function error:", err);
    return {
      statusCode: 400,
      body: 'Bad request'
    };
  }
};