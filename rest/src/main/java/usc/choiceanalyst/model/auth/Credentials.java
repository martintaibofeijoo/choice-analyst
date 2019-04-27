package usc.choiceanalyst.model.auth;

import org.springframework.data.annotation.Id;

public class Credentials {
    @Id
    private String username;
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public Credentials setPassword(String password) {
        this.password = password;
        return this;
    }

}
