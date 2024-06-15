import { Model, DataTypes } from 'sequelize';
import { getConnexion } from './sequelizeClient.js';

class List extends Model {}

List.init(
    {
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        position: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
    },
    {
        // * exécution de notre fonction qui retourne une instance de sequelize pour dire au modèle comment se connceter
        sequelize: getConnexion(),
        tableName: 'list',
    }
);

export { List };
