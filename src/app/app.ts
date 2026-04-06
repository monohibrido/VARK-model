import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface OpcionVARK {
  texto: string;
  categoria: string;
  seleccionada: boolean;
}

interface PreguntaVARK {
  texto: string;
  opciones: OpcionVARK[];
}

const PREGUNTAS_INICIALES: PreguntaVARK[] = [
  {
    texto: 'Estás en una clase nueva y el profesor explica un concepto difícil. Usted preferiría:',
    opciones: [
      { texto: 'Que dibuje un esquema o mapa mental.', categoria: 'V', seleccionada: false },
      { texto: 'Que lo explique con un ejemplo hablado.', categoria: 'A', seleccionada: false },
      { texto: 'Leer un folleto con la explicación.', categoria: 'R', seleccionada: false },
      { texto: 'Hacer un ejercicio práctico de inmediato.', categoria: 'K', seleccionada: false },
    ],
  },
  {
    texto: 'Te descargas una App nueva de edición de fotos. ¿Cómo aprendes a usarla?',
    opciones: [
      { texto: 'Miro las capturas de pantalla de ayuda.', categoria: 'V', seleccionada: false },
      {
        texto: 'Busco un video tutorial con alguien hablando.',
        categoria: 'A',
        seleccionada: false,
      },
      {
        texto: "Leo el manual de 'Ayuda' o las notas de la versión.",
        categoria: 'R',
        seleccionada: false,
      },
      {
        texto: 'Empiezo a apretar todos los botones para ver qué hacen.',
        categoria: 'K',
        seleccionada: false,
      },
    ],
  },
  {
    texto: 'Usted necesita dar direcciones a un amigo para ir a la casa de alguien. Usted:',
    opciones: [
      { texto: 'Le dibuja un croquis o mapa.', categoria: 'V', seleccionada: false },
      { texto: 'Le dice cómo llegar.', categoria: 'A', seleccionada: false },
      { texto: 'Le escribes la explicación de como llegar.', categoria: 'R', seleccionada: false },
      {
        texto: 'Le pide que lo siga en su auto o lo acompaña.',
        categoria: 'K',
        seleccionada: false,
      },
    ],
  },
  {
    texto: 'Usted no está seguro si una palabra se escribe "dependiente" o "dependante". Usted:',
    opciones: [
      {
        texto: 'Ve la palabra en su mente y elige la que parece correcta.',
        categoria: 'V',
        seleccionada: false,
      },
      { texto: ' La pronuncia en voz alta para escucharla.', categoria: 'A', seleccionada: false },
      { texto: 'La busca en el diccionario.', categoria: 'R', seleccionada: false },
      {
        texto: 'La escribe en un papel para ver cuál se ve mejor.',
        categoria: 'K',
        seleccionada: false,
      },
    ],
  },
  {
    texto:
      'Usted está planeando unas vacaciones para un grupo. Usted quiere algunas observaciones sobre el plan. Usted:',
    opciones: [
      {
        texto: 'Usa un mapa o sitios web para mostrarles los lugares.',
        categoria: 'V',
        seleccionada: false,
      },
      {
        texto: 'Les llama por teléfono o les envía un mensaje de voz.',
        categoria: 'A',
        seleccionada: false,
      },
      { texto: 'Les da una copia del itinerario impreso.', categoria: 'R', seleccionada: false },
      {
        texto: 'Describe algunas de las actividades que harán.',
        categoria: 'K',
        seleccionada: false,
      },
    ],
  },
  {
    texto: 'Usted va a cocinar algo especial para su familia. Usted:',
    opciones: [
      {
        texto: 'Mira las fotos en un libro de cocina para inspirarse.',
        categoria: 'V',
        seleccionada: false,
      },
      {
        texto: 'Le pregunta a un amigo o familiar por sugerencias.',
        categoria: 'A',
        seleccionada: false,
      },
      { texto: 'Lee una receta de un libro o de internet.', categoria: 'R', seleccionada: false },
      {
        texto: 'Cocina algo que ya conoce sin necesidad de instrucciones.',
        categoria: 'K',
        seleccionada: false,
      },
    ],
  },
  {
    texto:
      'Usted va a comprar una cámara digital o un celular. Aparte del precio, ¿qué es lo que más influye en su decisión?',
    opciones: [
      {
        texto: 'Que el diseño sea moderno y se vea bien.',
        categoria: 'V',
        seleccionada: false,
      },
      {
        texto: 'Los consejos que le da el vendedor o sus amigos.',
        categoria: 'A',
        seleccionada: false,
      },
      {
        texto: 'Leer los detalles sobre sus características y funciones.',
        categoria: 'R',
        seleccionada: false,
      },
      {
        texto: 'Probarlo, manipularlo y usar sus controles.',
        categoria: 'K',
        seleccionada: false,
      },
    ],
  },
  {
    texto: 'Usted tiene un problema con su rodilla. Usted preferiría que el médico:',
    opciones: [
      {
        texto: 'Le muestre un diagrama o una radiografía de lo que está mal.',
        categoria: 'V',
        seleccionada: false,
      },
      {
        texto: 'Le explique verbalmente qué es lo que está mal.',
        categoria: 'A',
        seleccionada: false,
      },
      {
        texto: 'Le dé un folleto que explique el problema.',
        categoria: 'R',
        seleccionada: false,
      },
      {
        texto: ' Use un modelo de plástico de una rodilla para mostrarle qué sucede.',
        categoria: 'K',
        seleccionada: false,
      },
    ],
  },
  {
    texto: 'Usted prefiere un sitio web que tenga:',
    opciones: [
      {
        texto: 'Un diseño interesante y efectos visuales.',
        categoria: 'V',
        seleccionada: false,
      },
      {
        texto: 'Canales de audio, podcasts o videos con explicaciones.',
        categoria: 'A',
        seleccionada: false,
      },
      {
        texto: 'Descripciones escritas detalladas e información textual.',
        categoria: 'R',
        seleccionada: false,
      },
      {
        texto: 'Cosas que usted pueda cliquear, arrastrar o probar.',
        categoria: 'K',
        seleccionada: false,
      },
    ],
  },
  {
    texto: 'Usted ha terminado un curso y necesita algunas críticas para mejorar. Usted prefiere:',
    opciones: [
      {
        texto: 'Que usen gráficos o tablas para mostrar su progreso.',
        categoria: 'V',
        seleccionada: false,
      },
      {
        texto: 'Que le expliquen sus fallas en una charla personal.',
        categoria: 'A',
        seleccionada: false,
      },
      {
        texto: 'Que le entreguen un informe escrito con sus resultados.',
        categoria: 'R',
        seleccionada: false,
      },
      {
        texto: 'Que le den ejemplos reales de lo que hizo bien o mal.',
        categoria: 'K',
        seleccionada: false,
      },
    ],
  },
  {
    texto: 'Usted tiene que elegir comida en un restaurante o café. Usted:',
    opciones: [
      {
        texto: 'Mira lo que otros están comiendo o mira las fotos del menú.',
        categoria: 'V',
        seleccionada: false,
      },
      {
        texto: 'Le pide al camarero que le recomiende algo.',
        categoria: 'A',
        seleccionada: false,
      },
      {
        texto: ' Lee las descripciones detalladas en el menú.',
        categoria: 'R',
        seleccionada: false,
      },
      {
        texto: 'Elige algo que ya ha probado antes.',
        categoria: 'K',
        seleccionada: false,
      },
    ],
  },
  {
    texto:
      'Usted tiene que dar una queja sobre un servicio en un hotel o restaurante. Usted preferiría:',
    opciones: [
      {
        texto: 'Ir a la página web y llenar un formulario de reclamos.',
        categoria: 'V',
        seleccionada: false,
      },
      {
        texto: 'Hablar con el gerente cara a cara.',
        categoria: 'A',
        seleccionada: false,
      },
      {
        texto: 'Escribir una carta o un correo electrónico.',
        categoria: 'R',
        seleccionada: false,
      },
      {
        texto: 'Mostrarle a la persona exactamente cuál es el problema.',
        categoria: 'K',
        seleccionada: false,
      },
    ],
  },
];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  preguntas: PreguntaVARK[] = [...PREGUNTAS_INICIALES];
  quizComenzado: boolean = false;
  testFinalizado: boolean = false;
  indiceActual: number = 0;
  resultadoFinal: string | null = null;

  puntaje = { V: 0, A: 0, R: 0, K: 0 };

  empezarQuiz() {
    this.quizComenzado = true;
    this.indiceActual = 0;
  }

  finalizarQuiz() {
    this.puntaje = { V: 0, A: 0, R: 0, K: 0 };

    this.preguntas.forEach((pregunta) => {
      pregunta.opciones.forEach((opcion) => {
        if (opcion.seleccionada) {
          const cat = opcion.categoria as keyof typeof this.puntaje;
          this.puntaje[cat]++;
        }
      });
    });

    const valores = Object.values(this.puntaje);
    const maximo = Math.max(...valores);

    if (maximo === 0) {
      this.resultadoFinal = 'Sin definir (No seleccionaste opciones)';
      return;
    }

    const ganadorLetra = Object.keys(this.puntaje).find(
      (key) => this.puntaje[key as keyof typeof this.puntaje] === maximo,
    );

    const nombres: any = {
      V: 'Visual',
      A: 'Auditivo',
      R: 'Lecto-Escritura',
      K: 'Kinestésico',
    };
    this.resultadoFinal = nombres[ganadorLetra!];
  }

  calcularResultado() {
    const valores = Object.values(this.puntaje);
    const maximo = Math.max(...valores);
    const ganador = Object.keys(this.puntaje).find(
      (key) => this.puntaje[key as keyof typeof this.puntaje] === maximo,
    );

    const nombres: any = { V: 'Visual', A: 'Auditivo', R: 'Lecto-Escritura', K: 'Kinestésico' };
    this.resultadoFinal = nombres[ganador!] || 'Multimodal';
  }

  reiniciarQuiz() {
    this.indiceActual = 0;
    this.quizComenzado = false;
    this.testFinalizado = false;
    this.resultadoFinal = null;
    this.puntaje = { V: 0, A: 0, R: 0, K: 0 };

    this.preguntas = PREGUNTAS_INICIALES.map((p) => ({
      ...p,
      opciones: p.opciones.map((o) => ({ ...o, seleccionada: false })),
    }));
  }

  siguientePregunta() {
    if (this.indiceActual < this.preguntas.length - 1) {
      this.indiceActual++;
    } else {
      this.quizComenzado = false;
      this.testFinalizado = true;
      this.finalizarQuiz();
    }
  }

  seleccionarOpcion(cat: string) {
    const categoria = cat as keyof typeof this.puntaje;
    this.puntaje[categoria]++;

    if (this.indiceActual < this.preguntas.length - 1) {
      this.indiceActual++;
    } else {
      this.quizComenzado = false;
    }
  }
}
