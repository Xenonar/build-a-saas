import initStrip from 'stripe'
import { supabase } from '../../utils/supabase';

const handler = async (req, res) =>{
    //checking that the req have passing API secret key or not
    if(req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET)
    {
        return res.status(401).send('You are not authorized to call this API!')
    }
    const stripe = initStrip(process.env.STRIPE_SECRET);

    const customer = await stripe.customers.create({
        email: req.body.record.email
    })
    await supabase.from('profile').update({
        stripe_customer: customer.id
    }).eq('id',req.body.record.id)

    res.send({message: `strip customer created: ${customer.id}`})
}
export default handler;