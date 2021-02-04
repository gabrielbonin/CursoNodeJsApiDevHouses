import * as Yup from 'yup';
import House from '../models/House';
import User from '../models/User';

class HouseController {
  // show

  async index(req, res) {
    const { status } = req.query;
    const houses = await House.find({ status });
    return res.json(houses);
  }

  // new
  async store(req, res) {
    // validations
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      price: Yup.number().required().positive(),
      location: Yup.string().required(),
      status: Yup.boolean().required(),
    });

    const { filename } = req.file;
    const { description, price, location, status } = req.body;
    const { user_id } = req.headers;
    // verifica se foi validado o schema validation via seu body
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'falha na validação' });
    }

    const house = await House.create({
      user: user_id,
      thumbnail: filename,
      description,
      price,
      location,
      status,
    });
    return res.json(house);
  }

  async update(req, res) {
    // validations
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      price: Yup.number().required().positive(),
      location: Yup.string().required(),
      status: Yup.boolean().required(),
    });

    const { filename } = req.file;
    const { house_id } = req.params;
    const { description, price, location, status } = req.body;
    const { user_id } = req.headers;

    // verifica se foi validado o schema validation via seu body
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'falha na validação' });
    }

    const user = await User.findById(user_id);
    const houses = await House.findById(house_id);

    if (String(user._id) !== String(houses.user)) {
      return res.status(401).json({ error: 'Não autorizado' });
    }

    await House.updateOne(
      { _id: house_id },
      {
        user: user_id,
        thumbnail: filename,
        description,
        location,
        price,
        status,
      }
    );
    return res.json({ message: 'casa alterada' });
  }

  async destroy(req, res) {
    const { house_id } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);
    const houses = await House.findById(house_id);

    if (String(user._id) !== String(houses.user)) {
      return res.status(401).json({ error: 'Não autorizado' });
    }

    await House.findByIdAndDelete({ _id: house_id });
    return res.json({ message: 'Casa excluida com sucesso!' });
  }
}
export default new HouseController();
