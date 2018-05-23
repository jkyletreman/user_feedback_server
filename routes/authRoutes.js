const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    //whoever comes through the authentication route, this is where we redirect them into the application.
    //this will be to our dashboard of surveys
    (req, res) => {
      // this will direct them to the dashboard component, combining server side routing and client side
      res.redirect('/surveys');
    }
  );

  app.get("/api/logout", (req, res) => {
    // .logout is authomatically attached to req by passport
    req.logout();
    // this will show the user they are logged out
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
        res.send(req.user)
  });
};
