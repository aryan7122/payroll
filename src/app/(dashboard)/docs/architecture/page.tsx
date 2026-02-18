"use client"

import { MermaidView } from "@/components/common/mermaid-view"

const graphCode = `
graph TD
    %% GLOBAL STYLES
    classDef step fill:#0f172a,color:#e2e8f0,stroke:#3b82f6,stroke-width:2px,rx:10,ry:10;
    classDef start fill:#2563eb,color:#fff,stroke:#1d4ed8,stroke-width:2px,rx:10,ry:10;
    classDef endNode fill:#16a34a,color:#fff,stroke:#15803d,stroke-width:2px,rx:10,ry:10;
    classDef note fill:#1e293b,color:#94a3b8,stroke:#334155,stroke-width:1px,stroke-dasharray: 5 5;

    %% START
    Start((� Start Here)):::start
    
    %% STEP 1: SETUP
    subgraph S1 [1️⃣ Initial Setup]
        direction TB
        Set_Comp[🏢 Company Profile <br/> /settings]:::step
        Set_Struct[�️ Define Departments]:::note
        Start --> Set_Comp
        Set_Comp -.-> Set_Struct
    end

    %% STEP 2: EMPLOYEES
    subgraph S2 [2️⃣ Add People]
        direction TB
        Add_Emp[➕ Add Employee <br/> /employees/onboarding]:::step
        Bulk_Imp[� Bulk Import Excel]:::note
        Set_Comp --> Add_Emp
        Add_Emp -.-> Bulk_Imp
    end

    %% STEP 3: OPERATIONS
    subgraph S3 [3️⃣ Run Payroll]
        direction TB
        Run_Pay[⚙️ Process Payroll <br/> /payroll/run]:::step
        Rev_Att[� Review Attendance]:::note
        Add_Emp --> Run_Pay
        Run_Pay -.-> Rev_Att
    end

    %% STEP 4: OUTPUT
    subgraph S4 [4️⃣ Reports & Slips]
        direction TB
        Get_Slips[📄 Download Payslips <br/> /payslips]:::endNode
        Stat_Rep[⚖️ Statutory Forms <br/> /compliance]:::step
        
        Run_Pay --> Get_Slips
        Get_Slips --> Stat_Rep
    end
`

export default function ArchitecturePage() {
    return (
        <div className="h-[calc(100vh-11.5rem)] w-full flex items-center justify-center overflow-auto">
            <MermaidView chart={graphCode} />
        </div>
    )
}
