import JWTAuthetificator from '../../authentification/JWT';
import responseHandler from '../../utils/responseHandler';
import JWTMiddlewere from './JWTMiddlewere';

export default new JWTMiddlewere(JWTAuthetificator, responseHandler);
