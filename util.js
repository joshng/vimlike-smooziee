function extend(obj, members) {
  for (var member in members) {
    obj[member] = members[member];
  }
  return obj;
}
