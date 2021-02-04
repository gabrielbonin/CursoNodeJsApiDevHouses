import { Schema, model } from 'mongoose';

const HouseSchema = new Schema(
  {
    thumbnail: String,
    description: String,
    price: Number,
    location: String,
    status: Boolean,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    toJSON: {
      virtuals: true, // habilitar campo virtual sem gravar no bd
    },
  }
);

HouseSchema.virtual('thumbnail_URL').get(function () {
  return `http://localhost:3333/files/${this.thumbnail}`; // retornar um campo virtual 'url' para acesso de imagens
});
export default model('House', HouseSchema);
