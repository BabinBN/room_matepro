package customer.room_matepro_.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class sign_inService {
    @Autowired 
    sign_inDAO signInDAO;
    
    public sign_in AddSignIn(sign_in signIn) {
        return signInDAO.CreateSignIn(signIn);
    }
}
