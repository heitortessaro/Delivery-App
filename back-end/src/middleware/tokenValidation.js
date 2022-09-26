const { token } = require('../helpers/token');
const { user } = require('../database/models');

class TokenValidation {
    constructor(userModel = user) {
        this.userModel = userModel;
    }

    async validate(req, res, next) {
        const t = req.headers.authorization;
        if (!t) {
            return res.status(401).json({ message: 'Token not found' });
          }
        try {
            const { data } = token.verify(t);
            const u = await this.userModel
                .findOne({ where: { email: data.email, password: data.hashedPassword } });
            if (!u) {
            return res
              .status(401)
              .json({ message: 'User not found' });
            }
            req.user = u;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Expired or invalid token' });
          }
    }
}

module.exports = {
    TokenValidation,
};