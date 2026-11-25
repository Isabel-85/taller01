import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; 
import { Persona } from './entities/persona.entity';


@Injectable()
export class PersonaService {
  constructor(@InjectRepository(Persona)
  private readonly personaRepository:Repository<Persona>){}

  async create(createPersonaDto: CreatePersonaDto):Promise<Persona> {
    const persona = this.personaRepository.create(createPersonaDto);
    return await this.personaRepository.save(persona);
  }

  async findAll():Promise<Persona[]> {
    return await this.personaRepository.find();
  }

  async findOne(id: string): Promise<Persona> {
    const persona = await this.personaRepository.findOneBy({
      id_persona: id,});

    if(!persona){
      throw new NotFoundException('Registro no enocntrado');
    }
    return persona;
  }

  

  async update(id: string, updatePersonaDto: UpdatePersonaDto):Promise<Persona> {
    const persona = await this.findOne(id);
    Object.assign(persona, updatePersonaDto);
    return await this.personaRepository.save(persona);
  }

  async remove(id: string):Promise<void> {
    const persona = await this.findOne(id);
    await this.personaRepository.remove(persona);
  }
}
