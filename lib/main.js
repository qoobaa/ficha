spade.require("sproutcore");
spade.require("sproutcore-datastore");

Ficha = SC.Application.create({
    store: SC.Store.create().from("Ficha.FixturesDataSource")
});

Ficha.store.commitRecordsAutomatically = true;

Ficha.FixturesDataSource = SC.FixturesDataSource.extend();

Ficha.Card = SC.Record.extend({
    primaryKey: "id",

    front: SC.Record.attr(String),
    back: SC.Record.attr(String)
});

Ficha.Card.FIXTURES = [
    { id: "1", front: "flibbertigibbet", back: "a flighty or whimsical person, usually a young woman" },
    { id: "2", front: "surreptitious", back: "kept secret, esp. because it would not be approved of" },
    { id: "3", front: "abstruse", back: "difficult to understand; obscure" }
];

Ficha.cardsController = SC.ArrayController.create({
    content: []
});

Ficha.CardsView = SC.CollectionView.extend({
    tagName: "ul",
    contentBinding: "Ficha.cardsController.content",
    itemClassView: Ficha.CardView
});

Ficha.NewCardView = SC.View.extend({
    tagName: "li",
    templateName: "card-new"
});

Ficha.CardView = SC.View.extend({
    tagName: "li",
    templateName: "card",
    cardBinding: "content",
    template: Handlebars.compile("dupa")
});

Ficha.CardSideTextArea = SC.TextArea.extend({
    attributeBindings: ["rows", "cols"],
    rows: "2",
    cols: "12"
});

Ficha.cardController = SC.Object.create({

});

Ficha.cardsController.set("content", Ficha.store.find(Ficha.Card));
