// DWC Spoolman Integration Plugin
export default {
    name: 'SpoolmanPlugin',
    template: `
        <div class="container-fluid pt-2">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="mb-0">
                                <i class="fas fa-spool mr-2"></i>
                                Spoolman Integration
                            </h5>
                        </div>
                        <div class="card-body">
                            <p>Velkommen til Spoolman Integration Plugin!</p>
                            <p>Dette plugin integrerer med Spoolman filament management system.</p>
                            
                            <div class="alert alert-info">
                                <strong>Status:</strong> Plugin indlæst korrekt
                            </div>
                            
                            <div class="form-group">
                                <label for="spoolman-server">Spoolman Server</label>
                                <input type="text" class="form-control" id="spoolman-server" 
                                       placeholder="192.168.1.100:7912" v-model="serverAddress">
                            </div>
                            
                            <button class="btn btn-primary" @click="testConnection" :disabled="testing">
                                <i class="fas fa-plug mr-1"></i>
                                {{ testing ? 'Tester...' : 'Test Forbindelse' }}
                            </button>
                            
                            <div v-if="status" class="mt-3">
                                <div class="alert" :class="'alert-' + (connected ? 'success' : 'danger')">
                                    {{ status }}
                                </div>
                            </div>
                            
                            <div class="mt-4" v-if="connected">
                                <div class="row">
                                    <div class="col-md-6" v-for="(tool, index) in tools" :key="index">
                                        <div class="card border-secondary mb-3">
                                            <div class="card-header bg-light">
                                                <strong>Tool {{ index }} (T{{ index }})</strong>
                                            </div>
                                            <div class="card-body">
                                                <div class="form-group">
                                                    <label>Filament</label>
                                                    <select class="form-control form-control-sm" v-model="tool.filamentId">
                                                        <option value="">-- Vælg filament --</option>
                                                        <option value="1">PLA - Hvid</option>
                                                        <option value="2">PETG - Sort</option>
                                                        <option value="3">ABS - Rød</option>
                                                    </select>
                                                </div>
                                                
                                                <div v-if="tool.filamentId" class="small text-muted">
                                                    <strong>Forbrug:</strong> {{ tool.usedLength }}mm
                                                </div>
                                                
                                                <button class="btn btn-sm btn-warning btn-block mt-2" 
                                                        @click="ejectFilament(index)" :disabled="!tool.filamentId">
                                                    <i class="fas fa-eject mr-1"></i>
                                                    Eject
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            serverAddress: 'localhost:7912',
            connected: false,
            status: '',
            testing: false,
            tools: [
                { filamentId: '', usedLength: 0 },
                { filamentId: '', usedLength: 0 },
                { filamentId: '', usedLength: 0 },
                { filamentId: '', usedLength: 0 }
            ]
        }
    },
    methods: {
        testConnection() {
            this.testing = true;
            this.status = 'Tester forbindelse...';
            
            // Simuler forbindelsestest
            setTimeout(() => {
                this.connected = true;
                this.status = 'Forbundet til Spoolman server!';
                this.testing = false;
            }, 1500);
        },
        
        ejectFilament(toolIndex) {
            if (this.tools[toolIndex].filamentId) {
                this.tools[toolIndex].filamentId = '';
                this.tools[toolIndex].usedLength = 0;
                this.status = `Filament ejected fra Tool ${toolIndex}`;
            }
        }
    }
};