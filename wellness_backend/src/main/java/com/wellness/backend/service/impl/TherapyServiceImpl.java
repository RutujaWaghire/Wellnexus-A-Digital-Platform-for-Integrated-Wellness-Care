package com.wellness.backend.service.impl;

import com.wellness.backend.model.Therapy;
import com.wellness.backend.repository.TherapyRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TherapyServiceImpl implements TherapyService {

    private final TherapyRepository therapyRepository;

    public TherapyServiceImpl(TherapyRepository therapyRepository) {
        this.therapyRepository = therapyRepository;
    }

    @Override
    public Therapy addTherapy(Therapy therapy) {
        return therapyRepository.save(therapy);
    }

    @Override
    public List<Therapy> getAllTherapies() {
        return therapyRepository.findAll();
    }

    @Override
    public Therapy getTherapyById(Long id) {
        return therapyRepository.findById(id).orElse(null);
    }

    @Override
    public List<Therapy> getTherapiesByPractitioner(Long practitionerId) {
        return therapyRepository.findByPractitionerId(practitionerId);
    }

    @Override
    public Therapy updateTherapy(Long id, Therapy therapy) {
        Optional<Therapy> existing = therapyRepository.findById(id);
        if (existing.isPresent()) {
            Therapy t = existing.get();
            t.setName(therapy.getName());
            t.setCategory(therapy.getCategory());     // added category
            t.setPractitionerId(therapy.getPractitionerId());
            t.setPrice(therapy.getPrice());           // added price
            return therapyRepository.save(t);
        }
        return null;
    }


    @Override
    public void deleteTherapy(Long id) {
        therapyRepository.deleteById(id);
    }
}
