package customer.room_matepro_.login;


import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@SuppressWarnings("serial")

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
@Component
public class sign_inEntity {
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "full_name")
    private String fullname;
    @Column(name="email")
    private String email;
    @Column(name="phone_number")
    private String phonenumber;
    @Column(name="password_pwd")
    private String passwordPwd;
    @Column(name="role_user")
    private String roleUser;
}
