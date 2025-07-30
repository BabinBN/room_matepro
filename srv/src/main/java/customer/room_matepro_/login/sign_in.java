package customer.room_matepro_.login;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.ColumnResult;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.Entity;
import jakarta.persistence.SqlResultSetMapping;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@JsonIgnoreProperties(ignoreUnknown = true)

@SqlResultSetMapping(
        name = "sign_inMapping",
        classes = @ConstructorResult(
            targetClass =sign_in.class,
            columns = {
               @ColumnResult(name = "user_id", type = Long.class),
               @ColumnResult(name = "full_name", type = String.class),
                @ColumnResult(name = "email", type = String.class),
                @ColumnResult(name = "phone_number", type = String.class),
                @ColumnResult(name = "password_pwd", type = String.class),
                @ColumnResult(name = "role_user", type = String.class)

            }
        )

)
public class sign_in 
{
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
