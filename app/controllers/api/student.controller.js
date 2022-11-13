
class StudentController {
  index(req, res, next) {
    const user = { name: "John", email: "abc@gmail.com" };
    const jsonContent = JSON.stringify(user);
    
    res.send(jsonContent);
  }
}

module.exports = new StudentController();
