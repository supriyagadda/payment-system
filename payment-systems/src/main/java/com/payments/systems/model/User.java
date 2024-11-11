package com.payments.systems.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "userdetails")
@Entity
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Adjust this strategy if needed
    @Column(name = "userid")
    private int userid;
    private int statusid;
    @NotEmpty(message = "firstname is required")
    private String firstname;
    @NotEmpty(message = "lastname is required.")
    private String lastname;
    @NotEmpty(message = "email is required.")
    private String emailid;
    @NotEmpty(message = "password is required.")
    private String password;
}
