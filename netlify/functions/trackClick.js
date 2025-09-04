const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

exports.handler = async (event) => {
  const { linkName } = JSON.parse(event.body);
  await supabase.from('LinkClicks').insert([{ link_name: linkName }]);
  return {
    statusCode: 200,
    body: 'Click logged'
  };
};