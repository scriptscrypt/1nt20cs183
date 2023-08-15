const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const Company = require('../models/companies.js');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};

passport.use(
  new Strategy(options, async (payload, done) => {
    try {
      const Company = await Company.findById(payload.sub);

      if (!Company) {
        return done(null, false);
      }

      return done(null, Company);
    } catch (error) {
      return done(error, false);
    }
  })
);
