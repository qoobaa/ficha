var Ficha = SC.Application.create();

Ficha.Card = SC.Object.extend({
    front: null,
    back: null,

    ready: function () {
        return this.get("front") && this.get("back");
    }.property("front", "back")
});

Ficha.cardsController = SC.ArrayController.create();

Ficha.cardController = SC.Object.create({
    currentCard: null,

    newCard: function () {
        this.set("currentCard", Ficha.Card.create());
    },

    createCard: function () {
        Ficha.cardsController.pushObject(this.get("currentCard"));
        this.set("currentCard", null); // alternatively, invoke this.newCard()
    }
});

Ficha.SideView = SC.TextField.extend({
    insertNewline: function () {
        var currentCard = Ficha.cardController.currentCard;

        if (currentCard.get("ready")) {
            Ficha.cardController.createCard();
        }
    }
});
