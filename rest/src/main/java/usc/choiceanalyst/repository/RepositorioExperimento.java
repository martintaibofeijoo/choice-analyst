package usc.choiceanalyst.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import usc.choiceanalyst.model.ModeloExperimento;

import java.util.List;
import java.util.Optional;

public interface RepositorioExperimento extends MongoRepository<ModeloExperimento, String> {
    boolean existsByIdExperimento(String idExperimento);
    void deleteByIdExperimento(String idExperimento);
    Optional<ModeloExperimento> findByIdExperimento(String idExperimento);
    List<ModeloExperimento> findByIdAdministrador(String idAdministrador);
    List<ModeloExperimento> findAll();
    List<ModeloExperimento> findByIdsEstablecimientosContains(String idExtablecimiento);
    List<ModeloExperimento> findByIdAdministradorAndIdsEstablecimientosContains(
            String idAdministrador, String idExtablecimiento
    );
    ModeloExperimento save(ModeloExperimento entity);
}
