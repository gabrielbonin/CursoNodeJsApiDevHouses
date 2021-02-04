// metodos: index, show, update, store, destroy
/*
index: listagem de sessoes
store: criar nova sessao
show: listar unica sessao
update: alterar alguma sessao
destroy: deletar alguma sessa
*/
import * as Yup from 'yup';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    // async pois está utilizando o await onde espera a requisição demorada do banco
    // validação
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });

    const { email } = req.body;
    // passou da validação?
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'falha na validação' });
    }
    // verifica se user existe
    let user = await User.findOne({ email });
    if (!user) {
      // se nao existir: cria
      user = await User.create({ email }); // ou qnd é unico só {email}
    }
    // senao retorna ele
    return res.json(user);
  }
}
export default new SessionController();
