package usc.choiceanalyst.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import usc.choiceanalyst.model.ModeloExperiencia;

import java.util.List;
import java.util.Optional;

public interface RepositorioExperiencia extends MongoRepository<ModeloExperiencia, String> {
    boolean existsByIdEstablecimiento(String idEstablecimiento);
    boolean existsByIdExperimento(String idExperimento);
    void deleteByIdCliente(String idCliente);
    List<ModeloExperiencia>  findByIdCliente(String username);
    List<ModeloExperiencia> findAll();
    List<ModeloExperiencia> findByIdEstablecimientoAndIdExperimento(String idEstablecimiento, String idExperimento);
    Page<ModeloExperiencia> findAll(Pageable pageable);
    ModeloExperiencia save(ModeloExperiencia entity);
}
