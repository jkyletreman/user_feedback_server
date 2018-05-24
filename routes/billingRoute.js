const keys = require("../config/keys");
const stripe = require('stripe')(keys.stripeSecretKey);


module.exports = app => {
  app.post("/api/stripe", async (req, res) => {
    //no user check, return unauthorized
    if(!req.user) {
      return res.status(401).send({ error: "You must log in to add credits"});
    }
    //charges user
    stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: "$5 for 5 credits",
      source: req.body.id
    });
    // updates model
    // passport takes care of attaching the model to the request
    req.user.credits += 5;
    // updating the db
    const user = await req.user.save();

    res.send(user);
  });
};
