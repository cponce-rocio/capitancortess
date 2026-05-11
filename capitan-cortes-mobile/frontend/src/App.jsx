import { useState } from 'react'
import ExcelJS from 'exceljs'

export default function App(){

  const [records, setRecords] = useState([])

  const [form, setForm] = useState({
    container:'',
    client:'',
    observations:'',
    start:'',
    end:''
  })

  const calculateHours = (start,end)=>{
    if(!start || !end) return 0
    const diff = new Date(end) - new Date(start)
    return (diff / (1000*60*60)).toFixed(2)
  }

  const saveRecord = (e)=>{
    e.preventDefault()

    const newRecord = {
      ...form,
      hours: calculateHours(form.start, form.end)
    }

    setRecords([...records, newRecord])

    setForm({
      container:'',
      client:'',
      observations:'',
      start:'',
      end:''
    })
  }

  const exportExcel = async()=>{

    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Contenedores')

    worksheet.columns = [
      {header:'Contenedor', key:'container', width:20},
      {header:'Cliente', key:'client', width:25},
      {header:'Observaciones', key:'observations', width:30},
      {header:'Inicio', key:'start', width:25},
      {header:'Fin', key:'end', width:25},
      {header:'Horas', key:'hours', width:15}
    ]

    records.forEach(r=>worksheet.addRow(r))

    const buffer = await workbook.xlsx.writeBuffer()

    const blob = new Blob([buffer], {
      type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })

    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'contenedores.xlsx'
    link.click()
  }

  return(
    <div className="container">

      <div className="header">
        <div className="header-content">
          <img src="/logo.png" alt="Logo Capitán Cortés" className="logo" />
          <div className="header-text">
            <h1>Capitán Cortés</h1>
            <p>Gestión Responsive de Contenedores</p>
          </div>
        </div>
      </div>

      <div className="card">

        <form onSubmit={saveRecord}>

          <div className="grid">

            <div>
              <label>Número de Contenedor</label>
              <input
                value={form.container}
                onChange={(e)=>setForm({...form, container:e.target.value})}
                required
              />
            </div>

            <div>
              <label>Cliente</label>
              <input
                value={form.client}
                onChange={(e)=>setForm({...form, client:e.target.value})}
                required
              />
            </div>

          </div>

          <label>Observaciones</label>
          <textarea
            value={form.observations}
            onChange={(e)=>setForm({...form, observations:e.target.value})}
          />

          <div className="grid">

            <div>
              <label>Inicio de Enchufe</label>
              <input
                type="datetime-local"
                value={form.start}
                onChange={(e)=>setForm({...form, start:e.target.value})}
                required
              />
            </div>

            <div>
              <label>Fin de Enchufe</label>
              <input
                type="datetime-local"
                value={form.end}
                onChange={(e)=>setForm({...form, end:e.target.value})}
                required
              />
            </div>

          </div>

          <button type="submit">
            Guardar Registro
          </button>

        </form>

      </div>

      <div className="card">

        <button onClick={exportExcel}>
          Exportar Excel
        </button>

      </div>

      <div className="card table-wrapper">

        <table>

          <thead>
            <tr>
              <th>Contenedor</th>
              <th>Cliente</th>
              <th>Horas</th>
            </tr>
          </thead>

          <tbody>

            {records.map((r,i)=>(
              <tr key={i}>
                <td>{r.container}</td>
                <td>{r.client}</td>
                <td>{r.hours}</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}