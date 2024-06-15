import { Model, DataTypes } from 'sequelize';
import { getConnexion } from './sequelizeClient.js';

class Tag extends Model {}

Tag.init(
    {
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },

        color: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: '#FFFFFF',
        },
    },
    {
        // * exécution de notre fonction qui retourne une instance de sequelize pour dire au modèle comment se connceter
        sequelize: getConnexion(),
        tableName: 'tag',
    }
);

export { Tag };
