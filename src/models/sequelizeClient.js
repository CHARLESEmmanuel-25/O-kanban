import { Sequelize } from 'sequelize';

function getConnexion() {
    return new Sequelize(process.env.PG_URL, {
        define: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            underscored: true,
        },

        logging: false,
    });
}

// export const sequelize =  new Sequelize(process.env.PG_URL, {
//     define: {
//         createdAt: 'created_at',
//         updatedAt: 'updated_at',
//         underscored: true,
//     },

//     logging: false,
// });

export { getConnexion };
