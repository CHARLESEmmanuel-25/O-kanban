import { List } from './list.js';
import { Card } from './card.js';
import { Tag } from './tag.js';

List.hasMany(Card, {
    as: 'cards',
    foreignKey: 'list_id',
    onDelete: 'CASCADE',
});

Card.belongsTo(List, {
    as: 'list',
    foreignKey: 'list_id',
});

Card.belongsToMany(Tag, {
    as: 'tags',
    through: 'card_has_tag',
    foreignKey: 'card_id',
    otherKey: 'tag_id',
});

Tag.belongsToMany(Card, {
    as: 'cards',
    through: 'card_has_tag',
    foreignKey: 'tag_id',
    otherKey: 'card_id',
});

export { List, Card, Tag };
