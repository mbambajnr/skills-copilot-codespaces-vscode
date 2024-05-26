function skillsMember() {
  // Get the member
  var member = getMember();
  // Get the skills
  var skills = member.getSkills();
  // Log the skills
  console.log(skills);
}