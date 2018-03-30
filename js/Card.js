// KLASA KANBAN CARD
function Card(id, name) {
  var self = this;
  
  this.id = id;
  this.name = name || 'No name given';
  this.element = createCard();

  function createCard() {
    var card = $('<li class="card"></li>');
    var cardDeleteBtn = $('<button class="btn-delete">x</button>');
    var cardDescription = $('<p class="card-description"></p>');
    var cardEdit = $('<button class="btn-edit">/</button>');
    
    cardDeleteBtn.click(function(){
      self.removeCard();
    });
    
    card.append(cardEdit);
    card.append(cardDeleteBtn);
    cardDescription.text(self.name);
    card.append(cardDescription)
    return card;
  }
}
Card.prototype = {
  removeCard: function() {
    var self = this;
    $.ajax({
      url: baseUrl + '/card/' + self.id,
      method: 'DELETE',
      success: function(){
        self.$element.remove();
      }
    });
  }
}

Card.prototype.editCard = function() {
    var self = this;
    myPrompt('Enter new name of the card', function(name){
        if (name != self.name) {
            $.ajax({
                url: baseUrl + '/card/' + self.id,
                type: 'PUT',
                data: {
                    name: name,
                    bootcamp_kanban_column_id: self.$element[0].parentNode.id
                },
                success: function(response) {
                    self.$element.children('.card-description').text(name);
                    self.name = name;
                }
            });
        }
    }, this.name);
}