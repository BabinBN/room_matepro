package customer.room_matepro_.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@Controller
@RequestMapping("/login")
public class sign_inController {
    
    @Autowired
    sign_inService signInService;

    @PostMapping
    public String postMethodName(@RequestBody sign_in signIn) {
        return signInService.AddSignIn(signIn) != null ? "Success" : "Failure";
    }
    
}
