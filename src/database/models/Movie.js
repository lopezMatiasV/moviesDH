module.exports = (sequelize, dataTypes) => {
    let alias = 'Movie'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        title: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        rating: {
            type: dataTypes.DECIMAL(3, 1).UNSIGNED,
            allowNull: false
        },
        awards: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        release_date: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },
        length: dataTypes.BIGINT(10),
        genre_id: dataTypes.BIGINT(10)
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Movie = sequelize.define(alias,cols,config);

    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos (Genre - Actor)
    //asociacion con generos
    Movie.associate = (models) => {// asociamos la tabla con los modelos
        Movie.belongsTo(models.Genre,/*alias*/ {
            as: "genres",// nombre que usaremos en el controlador
            foreignKey: "genre_id"// clave foranea
        })
        Movie.belongsToMany(models.Actor,/*alias*/ {
            as:"actors", // nombre que usaremos en el controlador
            through: "actor_movie", // mediante la tabla pivot
            foreignKey: "movie_id", //clave foranea
            otherKey: "actor_id", // otra clave foranea
            /* timestamps: false */
        })
    }

    return Movie
};