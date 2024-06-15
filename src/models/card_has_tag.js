import { Model, DataTypes } from 'sequelize';
import { getConnexion } from './sequelizeClient.js';

class CardHasTag extends Model {}

CardHasTag.init(
    {
        card_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        tag_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        // * exécution de notre fonction qui retourne une instance de sequelize pour dire au modèle comment se connceter
        sequelize: getConnexion(),
        tableName: 'card_has_tag',
    }
);

export { CardHasTag };
