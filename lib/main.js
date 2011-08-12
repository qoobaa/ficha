spade.require("sproutcore");

Ficha = SC.Application.create();

Ficha.Card = SC.Object.extend({
    front: "",
    back: "",

    isValid: function () {
        return this.get("front") && this.get("back");
    }.property("front", "back")
});

Ficha.cardsController = SC.ArrayController.create({
    content: [],

    delete: function (a) {
        console.log(a);
    }
});

Ficha.cardController = SC.Object.create({
    currentCard: null,

    init: function () {
        this.newCard();
    },

    newCard: function () {
        this.set("currentCard", Ficha.Card.create());
    },

    createCard: function () {
        var currentCard = this.get("currentCard");

        if (currentCard.get("isValid")) {
            Ficha.cardsController.pushObject(this.get("currentCard"));
            this.newCard();
        }
    },

    sideViewInsertNewline: function (event) {
        this.createCard();
        setTimeout(function () {
            $(event.target).parents(".sc-view").find("input[type='text'][value='']:first").focus();
        }, 0);
    }
});

Ficha.SideView = SC.TextField.extend({
    insertNewline: function (event) {
        Ficha.cardController.sideViewInsertNewline(event);
    }
});
