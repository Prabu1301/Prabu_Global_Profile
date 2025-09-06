const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

exports.handler = async () => {
  await supabase.from('visits').insert({});
  return {
    statusCode: 200,
    body: 'Visit logged'
  };
};