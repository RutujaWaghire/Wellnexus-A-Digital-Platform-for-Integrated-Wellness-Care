package com.wellness.backend.service.impl;

import com.wellness.backend.model.Therapy;
import java.util.List;

public interface TherapyService {
	Therapy addTherapy(Therapy therapy);
	List<Therapy> getAllTherapies();
	Therapy getTherapyById(Long id);
	List<Therapy> getTherapiesByPractitioner(Long practitionerId);
	Therapy updateTherapy(Long id, Therapy therapy);
	void deleteTherapy(Long id);

   
}
