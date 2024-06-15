import { Model, DataTypes } from 'sequelize';
import { getConnexion } from './sequelizeClient.js';

class Card extends Model {}

Card.init(
    {
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        position: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        color: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: '#FFFFFF',
        },
        list_id: {
            type: DataTypes.INTEGER,
        },
    },
    {
        // * exécution de notre fonction qui retourne une instance de sequelize pour dire au modèle comment se connceter
        sequelize: getConnexion(),
        tableName: 'card',
    }
);

export { Card };
