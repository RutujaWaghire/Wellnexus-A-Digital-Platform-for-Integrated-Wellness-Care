package com.infosys.Wellness.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderRequestDTO {

    private Long productId;
    private Integer quantity;
}
