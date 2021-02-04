import Reserve from '../models/Reserve';
import User from '../models/User';
import House from '../models/House';

class ReserveController {
  async store(req, res) {
    const { user_id } = req.headers;
    const { house_id } = req.params;
    const { date } = req.body;

    const house = await House.findById(house_id);
    if (!house) {
      return res.status(400).json({ error: 'casa não existe' });
    }
    if (house.status !== true) {
      return res.status(400).json({ error: 'casa já reservada' });
    }
    const user = await User.findById(user_id);

    if (String(user._id) === String(house.user)) {
      return res.status(401).json({ error: 'Opção inválida' });
    }

    const reserve = await Reserve.create({
      user: user_id,
      house: house_id,
      date,
    });

    await reserve.populate('house').populate('user').execPopulate(); // devolver varios dados sobre os objetos

    return res.json(reserve);
  }

  async index(req, res) {
    const { user_id } = req.headers;
    const reserves = await Reserve.find({ user: user_id }).populate('house'); // acrescentar + dados da casa

    return res.json(reserves);
  }

  async destroy(req, res) {
    const { reserve_id } = req.body;
    await Reserve.findByIdAndDelete({ _id: reserve_id });

    return res.json({ message: 'reserva cancelada' });
  }
}
export default new ReserveController();
