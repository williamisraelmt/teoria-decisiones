// readonly INPUT_TYPE_STRING = 'string';
// readonly INPUT_TYPE_INTEGER = 'integer';
// readonly INPUT_TYPE_DOUBLE = 'double';
// readonly INPUT_TYPE_TIME = 'time';
// readonly INPUT_TYPE_DATE = 'date';
// readonly INPUT_TYPE_SELECT = 'select';
// readonly INPUT_TYPE_BOOLEAN = 'boolean';

const dailyOccupancyFields = {
  date: {
    key: 'date',
    name: 'Fecha del Reporte',
    type: 'date',
    settings: {}
  },
  employee_name: {
    key: 'employee_name',
    name: 'Nombre del empleado',
    type: 'string',
    settings: {}
  },
  supervisor_name: {
    key: 'supervisor_name',
    name: 'Nombre del supervisor',
    type: 'string',
    settings: {}
  },
  manager_name: {
    key: 'manager_name',
    name: 'Nombre del gerente',
    type: 'string',
    settings: {}
  },
  project_name: {
    key: 'project_name',
    name: 'Nombre del proyecto',
    type: 'string',
    settings: {}
  },
  occupancy: {
    key: 'occupancy',
    name: 'Ocupación',
    type: 'double',
    negative: 'more',
    settings: {}
  },
  handling_time: {
    key: 'handling_time',
    name: 'Tiempo AHT',
    type: 'double',
    negative: 'more',
    settings: {}
  },
  talk_time: {
    key: 'talk_time',
    name: 'Tiempo de llamada',
    type: 'double',
    negative: 'more',
    settings: {}
  },
  hold_time: {
    key: 'hold_time',
    name: 'Tiempo de Hold',
    type: 'double',
    negative: 'more',
    settings: {}
  },
  auxiliary_time: {
    key: 'auxiliary_time',
    name: 'Tiempo Auxiliar',
    type: 'double',
    negative: 'more',
    settings: {}
  },
  taken_calls: {
    key: 'taken_calls',
    name: 'Llamadas tomadas',
    type: 'double',
    negative: 'less',
    settings: {}
  },
  available_time: {
    key: 'available_time',
    name: 'Tiempo disponible',
    type: 'double',
    negative: 'more',
    settings: {}
  },
  after_call_working_time: {
    key: 'after_call_working_time',
    name: 'Tiempo AFK',
    type: 'double',
    negative: 'more',
    settings: {}
  },
  schedule_start_time: {
    key: 'schedule_start_time',
    name: 'Hora de Entrada',
    type: 'time',
    settings: {}
  },
  schedule_end_time: {
    key: 'schedule_end_time',
    name: 'Hora de Salida',
    type: 'time',
    settings: {}
  },
  work_start_date: {
    key: 'work_start_date',
    name: 'Inicio de labores',
    type: 'date',
    settings: {}
  },
  work_end_date: {
    key: 'work_end_date',
    name: 'Final de labores',
    type: 'date',
    settings: {
      nullableOperators: true,
    }
  }
};

const dailyPayrollFields = {
  date: {
    key: 'date',
    name: 'Fecha del Reporte',
    type: 'date',
    settings: {}
  },
  employee_name: {
    key: 'employee_name',
    name: 'Nombre del empleado',
    type: 'list',
    settings: {}
  },
  success_payrolls: {
    key: 'success_payrolls',
    name: 'Nóminas correctas',
    type: 'double',
    negative: 'more',
    settings: {}
  },
  failed_payrolls: {
    key: 'failed_payrolls',
    name: 'Nóminas incorrectas',
    type: 'double',
    negative: 'more',
    settings: {}
  },
  failed_success_payrolls: {
    key: 'failed_success_payrolls',
    name: 'Proporción de nóminas fallidas',
    type: 'double',
    negative: 'more',
    settings: {}
  },
  work_start_date: {
    key: 'work_start_date',
    name: 'Inicio de labores',
    type: 'date',
    settings: {}
  },
  work_end_date: {
    key: 'work_end_date',
    name: 'Final de labores',
    type: 'date',
    settings: {
      nullableOperators: true,
    }
  }
};

const dailyEquipmentAuditFields = {
  date: {
    key: 'date',
    name: 'Fecha del Reporte',
    type: 'date',
    settings: {}
  },
  auditor_name: {
    key: 'auditor_name',
    name: 'Nombre del auditor',
    type: 'list',
    settings: {}
  },
  supervisor_name: {
    key: 'supervisor_name',
    name: 'Nombre del supervisor',
    type: 'list',
    settings: {}
  },
  manager_name: {
    key: 'manager_name',
    name: 'Nombre del gerente',
    type: 'list',
    settings: {}
  },
  project_name: {
    key: 'project_name',
    name: 'Nombre del proyecto',
    type: 'list',
    settings: {}
  },
  requested_equipments: {
    key: 'requested_equipments',
    name: 'Equipos solicitados',
    type: 'double',
    negative: 'more',
    settings: {}
  },
  existing_equipments: {
    key: 'existing_equipments',
    name: 'Equipos en existencia',
    type: 'double',
    negative: 'more',
    settings: {}
  },
  existing_requested_equipments: {
    key: 'existing_requested_equipments',
    name: 'Proporción de equipos en existencia',
    type: 'double',
    negative: 'less',
    settings: {}
  },

};

export const reportsFields = {
  dailyOccupancy: dailyOccupancyFields,
  dailyPayroll: dailyPayrollFields,
  dailyEquipmentAudit: dailyEquipmentAuditFields
};
