package customer.room_matepro_.login;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.google.gson.Gson;
import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.StoredProcedureQuery;

@Repository
@Transactional
public class sign_inDAO {

    @PersistenceContext
    private EntityManager entityManager;

    public sign_in CreateSignIn(sign_in SignIn) {
        try {
            String reqPayload = new Gson().toJson(new sign_in[] { SignIn });
            StoredProcedureQuery query = entityManager.createStoredProcedureQuery("ADD_EDIT_USER", "sign_inMapping");
            query.registerStoredProcedureParameter("IN_PARAM", String.class, ParameterMode.IN);
            query.registerStoredProcedureParameter("EX_MESSAGE", String.class, ParameterMode.OUT);
            query.setParameter("IN_PARAM", reqPayload);
            query.execute();
            @SuppressWarnings("unchecked")
            List<sign_in> resultList = query.getResultList();
            return resultList.isEmpty() ? null : resultList.get(0);

        } catch (Exception e) {
            return null;
        }
    }
}
