BEGIN;

INSERT INTO
    "list" ("id", "title", "position")
VALUES
    (1, 'Liste de courses', 1),
    (2, 'TODO', 2),
    (3, 'Anniversaire de mickey', 3);

INSERT INTO
    "card" ("id", "position", "content", "color", "list_id")
VALUES
    (1, 3, 'Savon', '#FF00FF', 1),
    (2, 2, 'Tomates', NULL, 1),
    (3, 1, 'Concombre', '#00FF00', 1),
    (4, 1, 'Faire le ménage', '#FF00FF', 2),
    (5, 2, 'Apprendre c++', NULL, 2),
    (6, 3, 'Réviser pour le TP', '#00FF00', 2),
    -- échappe un single quote avec un autre single quote
    (7, 1, 'C''était hier', '#00FF00', 3);

INSERT INTO
    "tag" ("id", "name", "color")
VALUES
    (1, 'Urgent', '#00FF00'),
    (2, 'En retard', '#000000'),
    (3, 'Validé', '#FF00FF');

INSERT INTO
    "card_has_tag" ("card_id", "tag_id")
VALUES
    (1, 3),
    (1, 1),
    (5, 1),
    (4, 3);

SELECT
    SETVAL(
        'list_id_seq',
        (
            SELECT
                MAX(id)
            FROM
                "list"
        )
    );

SELECT
    SETVAL(
        'card_id_seq',
        (
            SELECT
                MAX(id)
            FROM
                "card"
        )
    );

SELECT
    SETVAL(
        'tag_id_seq',
        (
            SELECT
                MAX(id)
            FROM
                "tag"
        )
    );

COMMIT;