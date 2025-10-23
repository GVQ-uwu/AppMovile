import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Moon, Sun, Share2, Download, Calendar as CalendarIcon, LogIn } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface SettingsPanelProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function SettingsPanel({ theme, onToggleTheme }: SettingsPanelProps) {
  const handleShareSchedule = () => {
    toast.success("¡Horario copiado al portapapeles!");
  };

  const handleExportSchedule = () => {
    toast.success("Horario exportado exitosamente");
  };

  const handleConnectGoogleCalendar = () => {
    toast.info("Esta función requiere autenticación con Google Calendar");
  };

  const handleConnectInstitutional = () => {
    toast.info("Esta función requiere autenticación institucional");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Configuración</h1>
        <p className="text-muted-foreground">Personaliza tu experiencia</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Apariencia</CardTitle>
          <CardDescription>Personaliza el tema de la aplicación</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              <div>
                <Label>Modo Oscuro</Label>
                <p className="text-sm text-muted-foreground">
                  {theme === 'dark' ? 'Tema oscuro activado' : 'Tema claro activado'}
                </p>
              </div>
            </div>
            <Switch checked={theme === 'dark'} onCheckedChange={onToggleTheme} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Compartir y Exportar</CardTitle>
          <CardDescription>Comparte tu horario o expórtalo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={handleShareSchedule}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Compartir Horario
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={handleExportSchedule}
          >
            <Download className="mr-2 h-4 w-4" />
            Exportar como PDF
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Integraciones</CardTitle>
          <CardDescription>Conecta con servicios externos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <CalendarIcon className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium">Google Calendar</p>
                <p className="text-sm text-muted-foreground">Sincroniza tu horario</p>
              </div>
            </div>
            <Button onClick={handleConnectGoogleCalendar}>
              <LogIn className="mr-2 h-4 w-4" />
              Conectar
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <CalendarIcon className="h-5 w-5 text-purple-600" />
              <div>
                <p className="font-medium">Cuenta Institucional</p>
                <p className="text-sm text-muted-foreground">Vincula con tu universidad</p>
              </div>
            </div>
            <Button onClick={handleConnectInstitutional}>
              <LogIn className="mr-2 h-4 w-4" />
              Conectar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notificaciones</CardTitle>
          <CardDescription>Configura cómo recibir notificaciones</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Clases canceladas</Label>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label>Recordatorios de exámenes</Label>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label>Fechas importantes</Label>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label>Cambios de horario</Label>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Información</CardTitle>
          <CardDescription>Acerca de la aplicación</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Versión</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Año Académico</span>
              <span className="font-medium">2024-2025</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
