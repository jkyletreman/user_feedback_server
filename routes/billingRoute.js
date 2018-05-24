const keys = require("../config/keys");
const stripe = require('stripe')(keys.stripeSecretKey);


module.exports = app => {
  app.post("/api/stripe", async (req, res) => {
    stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: "$5 for 5 credits",
      source: req.body.id
    });
    // passport takes care of attaching the model to the request
    req.user.credits += 5;
    // updating the db
    const user = await req.user.save();

    res.send(user);
  });
};
