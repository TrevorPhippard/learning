import {
  Controller,
  Post as HttpPost,
  Body,
  Get,
  Param,
  Patch,
} from "@nestjs/common";
import { CompanyService } from "../application/services/company.service";
import { CreateCompanyDto } from "../application/dtos/create-company.dto";

@Controller("companies")
export class CompanyController {
  constructor(private readonly svc: CompanyService) {}

  @HttpPost()
  async create(@Body() dto: CreateCompanyDto) {
    return this.svc.create(dto);
  }

  @Get(":id")
  async get(@Param("id") id: string) {
    return this.svc.getById(id);
  }

  @Get()
  async findAll() {
    return this.svc.findAll();
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() dto: Partial<CreateCompanyDto>
  ) {
    return this.svc.updateCompany(id, dto);
  }
}
