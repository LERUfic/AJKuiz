function Room(id, owner) {
  this.id = id;
  this.people = [];
  this.owner = owner;
  this.status = "available";
};

Room.prototype.addPerson = function(personID) {
  if (this.status === "available") {
    this.people.push(personID);
  }
};

module.exports = Room;